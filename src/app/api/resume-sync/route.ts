import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
}

interface SyncResult {
  success: boolean;
  message: string;
  filename?: string;
  sha?: string;
  downloadUrl?: string;
  timestamp?: string;
  error?: string;
}

/**
 * Resume Sync API Route
 * 
 * Monitors a GitHub repository for resume updates and automatically
 * downloads the latest version when changes are detected.
 * 
 * Usage:
 * - GET: Check current resume status and available updates
 * - POST: Download and sync the latest resume from GitHub
 * 
 * Environment Variables:
 * - GITHUB_RESUME_REPO: GitHub repo in format "owner/repo" (default: "jamwal69/resume")
 * - GITHUB_RESUME_PATH: Path to resume in repo (default: "resume.pdf")
 * - GITHUB_TOKEN: Optional GitHub personal access token for private repos
 */

const GITHUB_REPO = process.env.GITHUB_RESUME_REPO || 'jamwal69/resume';
const RESUME_PATH = process.env.GITHUB_RESUME_PATH || 'resume.pdf';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Store the last known SHA to detect changes
let lastKnownSha: string | null = null;

async function getResumeFromGitHub(): Promise<GitHubFile | null> {
  try {
    const [owner, repo] = GITHUB_REPO.split('/');
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${RESUME_PATH}`;
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Resume-Sync'
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Resume not found at ${GITHUB_REPO}/${RESUME_PATH}`);
        return null;
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data: GitHubFile = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching resume from GitHub:', error);
    return null;
  }
}

async function downloadResume(downloadUrl: string, filename: string): Promise<boolean> {
  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Download failed: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const publicDir = path.join(process.cwd(), 'public', 'resumes');

    // Ensure directory exists
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }

    const filePath = path.join(publicDir, filename);
    await writeFile(filePath, Buffer.from(buffer));

    console.log(`✅ Resume downloaded successfully: ${filePath}`);
    return true;
  } catch (error) {
    console.error('Error downloading resume:', error);
    return false;
  }
}

// GET: Check for updates
export async function GET() {
  try {
    const fileData = await getResumeFromGitHub();

    if (!fileData) {
      return NextResponse.json<SyncResult>({
        success: false,
        message: 'Resume not found on GitHub',
        error: `Could not find resume at ${GITHUB_REPO}/${RESUME_PATH}`
      }, { status: 404 });
    }

    const hasUpdate = lastKnownSha !== null && lastKnownSha !== fileData.sha;

    return NextResponse.json<SyncResult>({
      success: true,
      message: hasUpdate 
        ? 'New resume version available!' 
        : lastKnownSha 
          ? 'Resume is up to date' 
          : 'Resume found on GitHub',
      filename: fileData.name,
      sha: fileData.sha,
      downloadUrl: fileData.download_url,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in GET /api/resume-sync:', error);
    return NextResponse.json<SyncResult>({
      success: false,
      message: 'Failed to check resume status',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST: Download and sync resume
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const forceSync = body?.force === true;

    const fileData = await getResumeFromGitHub();

    if (!fileData) {
      return NextResponse.json<SyncResult>({
        success: false,
        message: 'Resume not found on GitHub',
        error: `Could not find resume at ${GITHUB_REPO}/${RESUME_PATH}`
      }, { status: 404 });
    }

    // Check if update is needed
    if (!forceSync && lastKnownSha === fileData.sha) {
      return NextResponse.json<SyncResult>({
        success: true,
        message: 'Resume is already up to date',
        filename: fileData.name,
        sha: fileData.sha,
        timestamp: new Date().toISOString()
      });
    }

    // Download the resume
    const downloadSuccess = await downloadResume(fileData.download_url, fileData.name);

    if (!downloadSuccess) {
      return NextResponse.json<SyncResult>({
        success: false,
        message: 'Failed to download resume',
        error: 'Download operation failed'
      }, { status: 500 });
    }

    // Update last known SHA
    lastKnownSha = fileData.sha;

    // Optional: Trigger webhook notification (Vercel, Discord, Slack, etc.)
    if (process.env.WEBHOOK_URL) {
      try {
        await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: '📄 Resume updated successfully!',
            filename: fileData.name,
            sha: fileData.sha,
            timestamp: new Date().toISOString()
          })
        });
      } catch (webhookError) {
        console.warn('Webhook notification failed:', webhookError);
      }
    }

    return NextResponse.json<SyncResult>({
      success: true,
      message: 'Resume synced successfully!',
      filename: fileData.name,
      sha: fileData.sha,
      downloadUrl: `/resumes/${fileData.name}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in POST /api/resume-sync:', error);
    return NextResponse.json<SyncResult>({
      success: false,
      message: 'Failed to sync resume',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// OPTIONS: CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

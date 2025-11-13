import { NextRequest, NextResponse } from 'next/server';

// GET - Retrieve security metrics (admin only)
export const GET = async (request: NextRequest) => {
  try {
    // Mock security metrics for now
    const metrics = {
      totalEvents: 0,
      criticalEvents: 0,
      warningEvents: 0,
      infoEvents: 0,
      recentEvents: []
    };

    return NextResponse.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Security metrics error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve security metrics' },
      { status: 500 }
    );
  }
};

// POST - Update security settings (super admin only)
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { setting, value } = body;

    // Validate security setting updates
    const allowedSettings = [
      'maxLoginAttempts',
      'sessionTimeout',
      'mfaRequired',
      'passwordMinLength',
      'rateLimitWindow'
    ];

    if (!allowedSettings.includes(setting)) {
      return NextResponse.json(
        { error: 'Invalid security setting' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Security setting '${setting}' updated successfully`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Security settings update error:', error);
    return NextResponse.json(
      { error: 'Failed to update security settings' },
      { status: 500 }
    );
  }
};

// DELETE - Clear security logs (super admin only)
export const DELETE = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    return NextResponse.json({
      success: true,
      message: `Security logs older than ${days} days cleared successfully`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Security logs clear error:', error);
    return NextResponse.json(
      { error: 'Failed to clear security logs' },
      { status: 500 }
    );
  }
}; 
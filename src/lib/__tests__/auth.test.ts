import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSession } from '../auth';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

// Mock next/headers
vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

// Mock server-only to prevent errors in testing environment
vi.mock('server-only', () => ({}));

// Mock jose
vi.mock('jose', () => {
  const mockSign = vi.fn().mockResolvedValue('mocked-jwt-token');
  const mockSetIssuedAt = vi.fn().mockReturnValue({ sign: mockSign });
  const mockSetExpirationTime = vi.fn().mockReturnValue({ setIssuedAt: mockSetIssuedAt });
  const mockSetProtectedHeader = vi.fn().mockReturnValue({ setExpirationTime: mockSetExpirationTime });
  
  return {
    SignJWT: vi.fn(() => ({
      setProtectedHeader: mockSetProtectedHeader,
    })),
  };
});

describe('createSession', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('generates a JWT and sets the auth-token cookie', async () => {
    const mockCookieSet = vi.fn();
    (cookies as any).mockResolvedValue({
      set: mockCookieSet,
    });

    const userId = 'user-123';
    const email = 'test@example.com';
    
    // Freeze time roughly for expiresAt checking
    const now = Date.now();
    
    await createSession(userId, email);

    // 1. Verify JWT payload
    expect(SignJWT).toHaveBeenCalledWith(
      expect.objectContaining({
        userId,
        email,
        expiresAt: expect.any(Date),
      })
    );

    // 2. Verify cookies() was called to get the store
    expect(cookies).toHaveBeenCalled();

    // 3. Verify the cookie was set with the expected attributes
    expect(mockCookieSet).toHaveBeenCalledWith(
      'auth-token',
      'mocked-jwt-token',
      expect.objectContaining({
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: expect.any(Date),
      })
    );

    // Also assert that expiration is roughly 7 days from now
    const callArgs = mockCookieSet.mock.calls[0][2];
    const expiresAt = callArgs.expires.getTime();
    const expectedExpiration = now + 7 * 24 * 60 * 60 * 1000;
    
    // allow a 1 second delta since test execution takes a few ms
    expect(expiresAt).toBeGreaterThanOrEqual(expectedExpiration - 1000);
    expect(expiresAt).toBeLessThanOrEqual(expectedExpiration + 1000);
  });
});

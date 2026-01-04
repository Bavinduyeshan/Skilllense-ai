// import { Request, Response } from 'express';
// import { supabase } from '../config/supabase.js';

// interface RegisterBody {
//   email: string;
//   password: string;
//   fullName?: string;
// }

// interface LoginBody {
//   email: string;
//   password: string;
// }

// export async function register(req: Request, res: Response): Promise<void> {
//   try {
//     const { email, password, fullName } = req.body as RegisterBody;

//     if (!email || !password) {
//       res.status(400).json({
//         success: false,
//         message: 'Email and password are required'
//       });
//       return;
//     }

//     if (password.length < 6) {
//       res.status(400).json({
//         success: false,
//         message: 'Password must be at least 6 characters long'
//       });
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       res.status(400).json({
//         success: false,
//         message: 'Invalid email format'
//       });
//       return;
//     }

//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           full_name: fullName || '',
//           created_at: new Date().toISOString()
//         }
//       }
//     });

//     if (error) {
//       res.status(400).json({
//         success: false,
//         message: error.message,
//         error: error.name
//       });
//       return;
//     }

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully',
//       data: {
//         user: data.user,
//         session: data.session
//       }
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Registration failed',
//       error: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// }

// export async function login(req: Request, res: Response): Promise<void> {
//   try {
//     const { email, password } = req.body as LoginBody;

//     if (!email || !password) {
//       res.status(400).json({
//         success: false,
//         message: 'Email and password are required'
//       });
//       return;
//     }

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password
//     });

//     if (error) {
//       res.status(401).json({
//         success: false,
//         message: error.message,
//         error: error.name
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       data: {
//         user: data.user,
//         session: data.session,
//         access_token: data.session?.access_token
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Login failed',
//       error: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// }

// export async function logout(req: Request, res: Response): Promise<void> {
//   try {
//     const authHeader = req.headers.authorization;
    
//     if (authHeader && authHeader.startsWith('Bearer ')) {
//       const token = authHeader.substring(7);
//       await supabase.auth.admin.signOut(token);
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Logout successful'
//     });
//   } catch (error) {
//     console.error('Logout error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Logout failed',
//       error: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// }

// export async function getCurrentUser(req: Request, res: Response): Promise<void> {
//   try {
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       res.status(401).json({
//         success: false,
//         message: 'No token provided'
//       });
//       return;
//     }

//     const token = authHeader.substring(7);
//     const { data, error } = await supabase.auth.getUser(token);

//     if (error || !data.user) {
//       res.status(401).json({
//         success: false,
//         message: 'Invalid token'
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       data: { user: data.user }
//     });
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get user',
//       error: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// }

// export async function refreshToken(req: Request, res: Response): Promise<void> {
//   try {
//     const { refresh_token } = req.body;

//     if (!refresh_token) {
//       res.status(400).json({
//         success: false,
//         message: 'Refresh token is required'
//       });
//       return;
//     }

//     const { data, error } = await supabase.auth.refreshSession({
//       refresh_token
//     });

//     if (error) {
//       res.status(401).json({
//         success: false,
//         message: error.message
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Token refreshed successfully',
//       data: {
//         session: data.session,
//         access_token: data.session?.access_token
//       }
//     });
//   } catch (error) {
//     console.error('Token refresh error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to refresh token',
//       error: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// }


import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

interface RegisterBody {
  email: string;
  password: string;
  fullName?: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, fullName } = req.body as RegisterBody;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || '',
          created_at: new Date().toISOString()
        }
      }
    });

    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
        error: error.name
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: data.user,
        session: data.session,
        access_token: data.session?.access_token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    console.log('=== LOGIN REQUEST RECEIVED ===');
    console.log('Request body:', req.body);
    
    const { email, password } = req.body as LoginBody;

    if (!email || !password) {
      console.log('Missing email or password');
      res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
      return;
    }

    console.log('Attempting Supabase login for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    console.log('Supabase response:', {
      hasData: !!data,
      hasUser: !!data?.user,
      hasSession: !!data?.session,
      hasAccessToken: !!data?.session?.access_token,
      error: error?.message
    });

    if (error) {
      console.error('Supabase login error:', error);
      res.status(401).json({
        success: false,
        message: error.message,
        error: error.name
      });
      return;
    }

    if (!data.session || !data.session.access_token) {
      console.error('No session or access token in response');
      res.status(500).json({
        success: false,
        message: 'Login failed - no session created'
      });
      return;
    }

    console.log('Login successful, sending response');
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: data.user,
        session: data.session,
        access_token: data.session.access_token
      }
    });
    
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      await supabase.auth.admin.signOut(token);
    }

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'No token provided'
      });
      return;
    }

    const token = authHeader.substring(7);
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { user: data.user }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function refreshToken(req: Request, res: Response): Promise<void> {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
      return;
    }

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token
    });

    if (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        session: data.session,
        access_token: data.session?.access_token
      }
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to refresh token',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
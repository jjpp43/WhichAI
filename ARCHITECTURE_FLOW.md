# AI Blog System - Complete Architecture Flow

## 🔐 Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client (React)
    participant A as AuthProvider
    participant S as Supabase Auth
    participant DB as Database
    participant SA as Server Actions

    U->>C: Click "Sign in with Google"
    C->>A: signInWithGoogle()
    A->>S: OAuth redirect to Google
    S->>U: Google login page
    U->>S: Enter credentials
    S->>S: Validate credentials
    S->>C: Redirect to /auth/callback
    C->>SA: Exchange code for session
    SA->>DB: Create/update user profile
    DB->>SA: Return user data
    SA->>C: Set session cookies
    C->>A: Update user state
    A->>C: User authenticated
```

## 📝 Blog Post Management Flow

```mermaid
sequenceDiagram
    participant A as Admin User
    participant C as Client
    participant SA as Server Actions
    participant S as Supabase
    participant DB as Database
    participant Cache as Next.js Cache

    A->>C: Access admin dashboard
    C->>SA: getPosts('all')
    SA->>S: Query posts with RLS
    S->>DB: Check admin permissions
    DB->>S: Return posts
    S->>SA: Return data
    SA->>C: Display posts

    A->>C: Create new post
    C->>SA: createPost(data)
    SA->>S: Insert post
    S->>DB: Verify admin + insert
    DB->>S: Confirm insertion
    S->>SA: Return post
    SA->>Cache: revalidatePath('/blog')
    SA->>C: Update UI
```

## 💬 Comment System Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant SA as Server Actions
    participant S as Supabase
    participant DB as Database
    participant Cache as Next.js Cache

    U->>C: View blog post
    C->>SA: getPost(slug)
    SA->>S: Query post
    S->>DB: Check published status
    DB->>S: Return post
    S->>SA: Return data
    SA->>C: Display post

    C->>SA: getComments(postId)
    SA->>S: Query approved comments
    S->>DB: Filter by is_approved=true
    DB->>S: Return comments
    S->>SA: Return data
    SA->>C: Display comments

    U->>C: Submit comment
    C->>SA: createComment(data)
    SA->>S: Insert comment
    S->>DB: Verify auth + insert
    DB->>S: Confirm insertion
    S->>SA: Return comment
    SA->>Cache: revalidatePath('/blog/[slug]')
    SA->>C: Update UI
```

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "Frontend (Next.js App Router)"
        A[AuthProvider Context]
        B[LoginButton Component]
        C[Comments Component]
        D[Blog Pages]
        E[Admin Dashboard]
    end

    subgraph "Backend (Server Actions)"
        F[Auth Helpers]
        G[Posts Actions]
        H[Comments Actions]
    end

    subgraph "Database (Supabase)"
        I[Auth Users]
        J[Profiles Table]
        K[Posts Table]
        L[Comments Table]
        M[RLS Policies]
    end

    subgraph "External Services"
        N[Google OAuth]
        O[Supabase Auth]
    end

    A --> F
    B --> O
    C --> H
    D --> G
    E --> G
    F --> I
    G --> K
    H --> L
    I --> J
    K --> J
    L --> J
    L --> K
    M --> I
    M --> J
    M --> K
    M --> L
    O --> N
```

## 🔒 Security & Permissions Matrix

```mermaid
graph LR
    subgraph "User Types"
        A[Anonymous User]
        B[Authenticated User]
        C[Admin User]
    end

    subgraph "Permissions"
        D[View Published Posts]
        E[View Comments]
        F[Create Comments]
        G[Delete Own Comments]
        H[Create Posts]
        I[Edit Posts]
        J[Delete Posts]
        K[Manage All Comments]
    end

    A --> D
    A --> E
    B --> D
    B --> E
    B --> F
    B --> G
    C --> D
    C --> E
    C --> F
    C --> G
    C --> H
    C --> I
    C --> J
    C --> K
```

## 📊 Data Flow Diagram

```mermaid
flowchart TD
    A[User Action] --> B{Action Type?}

    B -->|Sign In| C[Google OAuth]
    B -->|View Post| D[Fetch Post Data]
    B -->|Add Comment| E[Create Comment]
    B -->|Admin Action| F[Admin Check]

    C --> G[Create User Profile]
    G --> H[Check Admin Email]
    H --> I[Set Admin Flag]

    D --> J[Query Posts Table]
    J --> K[Apply RLS Policies]
    K --> L[Return Published Posts]

    E --> M[Verify Authentication]
    M --> N[Insert Comment]
    N --> O[Revalidate Cache]

    F --> P[Check Admin Status]
    P --> Q[Execute Admin Action]
    Q --> R[Update Database]
    R --> O
```

## 🚀 Deployment Flow

```mermaid
graph TD
    A[Local Development] --> B[Set Environment Variables]
    B --> C[Run Supabase Migration]
    C --> D[Configure Google OAuth]
    D --> E[Test Authentication]
    E --> F[Deploy to Vercel]
    F --> G[Set Production Env Vars]
    G --> H[Configure Supabase Production]
    H --> I[System Live]
```

## 📁 File Structure

```
all_ai/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts          # OAuth callback handler
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx          # Individual blog post
│   │   │   └── page.tsx              # Blog listing
│   │   └── layout.tsx                # Root layout with AuthProvider
│   ├── components/
│   │   ├── AuthProvider.tsx          # Auth context provider
│   │   ├── LoginButton.tsx           # Sign in/out button
│   │   ├── Comments.tsx              # Comment system
│   │   └── ui/
│   │       └── button.tsx            # Reusable button component
│   └── lib/
│       ├── supabase.ts               # Supabase client config
│       ├── auth-helpers.ts           # Server auth utilities
│       ├── posts.ts                  # Post CRUD actions
│       └── comments.ts               # Comment actions
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql   # Database schema
└── .env.local                        # Environment variables
```

## 🔄 State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> Authenticated: User found
    Loading --> Unauthenticated: No user

    Unauthenticated --> Authenticating: Sign in clicked
    Authenticating --> Authenticated: OAuth success
    Authenticating --> Unauthenticated: OAuth failed

    Authenticated --> Loading: Sign out clicked
    Authenticated --> Admin: Admin check passed
    Authenticated --> User: Regular user

    Admin --> Authenticated: Sign out
    User --> Authenticated: Sign out
```

## 🎯 Key Features Summary

### ✅ **Implemented**

- **Google OAuth Authentication** with Supabase
- **Admin Role Management** via email allowlist
- **Row Level Security** policies for data protection
- **Server Actions** for secure data operations
- **Real-time Auth State** with React context
- **Comment System** with user permissions
- **Automatic Cache Revalidation** after changes
- **Responsive UI Components** with proper error handling

### 🔄 **Data Flow**

1. **Auth**: User signs in → Profile created → Admin status checked
2. **Posts**: Admin creates → RLS validates → Cache updated
3. **Comments**: User comments → Auth verified → Real-time update
4. **Security**: Every request → RLS policies → Permission checked

### 🛡️ **Security Features**

- **RLS Policies**: Database-level security
- **Server Actions**: Server-side validation
- **Admin Allowlist**: Email-based admin control
- **Session Management**: Secure cookie handling
- **Input Validation**: Server-side sanitization

This architecture provides a secure, scalable, and user-friendly blog system with proper separation of concerns and modern React/Next.js patterns.

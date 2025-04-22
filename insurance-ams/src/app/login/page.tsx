"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Role } from '@prisma/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }
      

      const data = await res.json();
      
      // Redirect based on user role
      console.log(data.role === Role.ADMIN);
      if (data.role === Role.ADMIN) {
        window.location.href = '/admin'
      } else if (data.role === Role.AGENT) {
        window.location.href = '/agent';
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Login</h2>

        {error && (
          <div style={{ marginBottom: '1rem', color: 'red' }}>{error}</div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="email"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="password"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#3b82f6',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}

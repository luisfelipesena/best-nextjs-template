'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { trpc } from '@/server/trpc/client';

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  const { data: profile, isLoading } = trpc.auth.profile.useQuery();
  const updateProfileMutation = trpc.auth.updateProfile.useMutation({
    onSuccess: () => {
      setIsEditing(false);
      // Refetch profile data
    },
  });

  const handleEdit = () => {
    if (profile) {
      setName(profile.name || '');
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) return;

    await updateProfileMutation.mutateAsync({ name });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName('');
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="animate-pulse">Loading profile...</div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <p>No profile data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={profile.email} disabled />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          {isEditing ? (
            <Input
              id="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          ) : (
            <Input id="name" value={profile.name || 'Not set'} disabled />
          )}
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit}>Edit Profile</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
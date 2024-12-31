import React from 'react';
import { Shield, UserMinus } from 'lucide-react';
import { User } from '../types';

interface ProfileHeaderProps {
  user: User;
  onBlock: () => void;
  onUnfriend: () => void;
}

export function ProfileHeader({ user, onBlock, onUnfriend }: ProfileHeaderProps) {
  return (
    <div className="relative mb-8">
      <div className="h-48 w-full overflow-hidden rounded-xl">
        <img
          src={user.coverImage || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute -bottom-6 left-8 flex items-end gap-4">
        <div className="relative">
          <img
            src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-green' : 'bg-gray'}`} />
        </div>
        
        <div className="backdrop-blur-md bg-white/30 rounded-lg p-4 mb-2 shadow-lg">
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm">
              Level {user.level}
            </span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-8 flex gap-2">
        <button
          onClick={onBlock}
          className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all text-white"
        >
          <Shield size={18} />
          Block
        </button>
        <button
          onClick={onUnfriend}
          className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all text-white"
        >
          <UserMinus size={18} />
          Unfriend
        </button>
      </div>
    </div>
  );
}
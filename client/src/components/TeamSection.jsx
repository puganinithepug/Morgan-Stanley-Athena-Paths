import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Users, Crown } from 'lucide-react';
import { API_URL } from '../config';

export default function TeamSection() {
  const { user, login } = useAuth();
  const { language } = useLanguage();

  const [team, setTeam] = useState(null);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [createName, setCreateName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Helper to reset status messages
  const resetStatus = () => {
    setError('');
    setSuccess('');
  };

  // Fetch team details from backend when user.team_id changes
  useEffect(() => {
    if (!user || !user.team_id) {
      setTeam(null);
      return;
    }

    let cancelled = false;

    async function loadTeam() {
      setLoadingTeam(true);
      resetStatus();
      try {
        const res = await fetch(`${API_URL}/teams/${user.team_id}`, {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Failed to load team');
        }
        const data = await res.json();
        if (!cancelled) {
          setTeam(data.team || null);
        }
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setTeam(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingTeam(false);
        }
      }
    }

    loadTeam();

    return () => {
      cancelled = true;
    };
  }, [user, user?.team_id]);

  if (!user) {
    return null; // Section only makes sense for logged-in users
  }

  const isFrench = language === 'fr';

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!createName.trim()) return;
    resetStatus();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/create_team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: createName.trim(),
          leader_uuid: user.id,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to create team');
      }
      const data = await res.json();

      // Refresh user from backend (/me) so team_id is up to date
      await login();

      setTeam(data.team || null);
      setCreateName('');
      setSuccess(
        isFrench ? "Équipe créée avec succès." : 'Team created successfully.'
      );
    } catch (e) {
      console.error(e);
      setError(
        isFrench
          ? "Impossible de créer l'équipe. Veuillez réessayer."
          : 'Unable to create team. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    resetStatus();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/join_team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          team_id: joinCode.trim(),
          member_uuid: user.id,
        }),
      });
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('TEAM_NOT_FOUND');
        }
        throw new Error('Failed to join team');
      }
      // Refresh user from backend to get updated team_id
      await login();

      // Load the team details for the joined team
      const teamRes = await fetch(
        `${API_URL}/teams/${joinCode.trim()}`,
        { credentials: 'include' }
      );
      if (teamRes.ok) {
        const teamData = await teamRes.json();
        setTeam(teamData.team || null);
      }

      setJoinCode('');
      setSuccess(
        isFrench ? "Équipe rejointe avec succès." : 'Joined team successfully.'
      );
    } catch (e) {
      console.error(e);
      if (e.message === 'TEAM_NOT_FOUND') {
        setError(
          isFrench
            ? "Aucune équipe trouvée avec cet identifiant."
            : 'No team found with that ID.'
        );
      } else {
        setError(
          isFrench
            ? "Impossible de rejoindre l'équipe. Veuillez réessayer."
            : 'Unable to join team. Please try again.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleLeaveTeam = async () => {
    resetStatus();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/leave_team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          member_uuid: user.id,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to leave team');
      }

      await login();
      setTeam(null);
      setSuccess(
        isFrench
          ? "Vous avez quitté l'équipe."
          : 'You have left the team.'
      );
    } catch (e) {
      console.error(e);
      setError(
        isFrench
          ? "Impossible de quitter l'équipe. Veuillez réessayer."
          : 'Unable to leave team. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const title = isFrench ? 'Vos équipes communautaires' : 'Your Community Teams';

  return (
    <Card className="bg-background border-2 border-foreground/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {team ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-foreground/70 mb-1">
                  {isFrench
                    ? 'Vous faites actuellement partie de cette équipe :'
                    : 'You are currently part of this team:'}
                </p>
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground text-lg">
                    {team.name}
                  </span>
                </div>
                {team.leader_name && (
                  <p className="text-xs text-foreground/60">
                    {isFrench ? 'Dirigé par ' : 'Led by '}
                    <span className="font-medium text-foreground">{team.leader_name}</span>
                  </p>
                )}
                <p className="text-xs text-foreground/60 mt-2">
                  {isFrench ? 'Identifiant de l\'équipe : ' : 'Team ID: '}
                  <span className="font-mono text-foreground/80">{team.team_id}</span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={submitting || loadingTeam}
                  onClick={handleLeaveTeam}
                >
                  {isFrench ? 'Quitter l\'équipe' : 'Leave team'}
                </Button>
              </div>
            </div>
            {(error || success) && (
              <p
                className={`text-xs ${
                  error ? 'text-red-500' : 'text-emerald-600'
                }`}
              >
                {error || success}
              </p>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Create team */}
            <form onSubmit={handleCreateTeam} className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Crown className="w-4 h-4 text-primary" />
                {isFrench ? 'Créer une équipe' : 'Create a team'}
              </h3>
              <p className="text-xs text-foreground/60">
                {isFrench
                  ? 'Donnez un nom à votre équipe et devenez son leader.'
                  : 'Give your team a name and become its leader.'}
              </p>
              <input
                type="text"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder={isFrench ? "Nom de l'équipe" : 'Team name'}
                disabled={submitting}
              />
              <Button
                type="submit"
                size="sm"
                disabled={submitting || !createName.trim()}
              >
                {isFrench ? 'Créer' : 'Create'}
              </Button>
            </form>

            {/* Join team */}
            <form onSubmit={handleJoinTeam} className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                {isFrench ? 'Rejoindre une équipe' : 'Join a team'}
              </h3>
              <p className="text-xs text-foreground/60">
                {isFrench
                  ? "Entrez l'identifiant d'équipe partagé par un ami ou un collègue."
                  : 'Enter the team ID shared by a friend or colleague.'}
              </p>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono"
                placeholder={isFrench ? "Identifiant d'équipe" : 'Team ID'}
                disabled={submitting}
              />
              <Button
                type="submit"
                size="sm"
                variant="outline"
                disabled={submitting || !joinCode.trim()}
              >
                {isFrench ? 'Rejoindre' : 'Join'}
              </Button>
            </form>

            {(error || success) && (
              <div className="md:col-span-2 mt-2">
                <p
                  className={`text-xs ${
                    error ? 'text-red-500' : 'text-emerald-600'
                  }`}
                >
                  {error || success}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { listSessions, revokeSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SessionRow = { id: string; token: string; userAgent?: string | null; createdAt: string | Date };

export function SessionsList() {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  async function load() {
    const { data } = await listSessions();
    setSessions((data as SessionRow[]) ?? []);
  }
  useEffect(() => { load(); }, []);
  async function revoke(token: string) {
    const { error } = await revokeSession({ token });
    if (error) return toast.error(error.message ?? "Revoke failed");
    toast.success("Session revoked.");
    load();
  }
  return (
    <Card>
      <CardHeader><CardTitle>Active sessions</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {sessions.length === 0 && <p className="text-sm text-muted-foreground">No other sessions.</p>}
        {sessions.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded border p-2 text-sm">
            <span className="truncate">{s.userAgent ?? "Unknown device"}</span>
            <Button variant="ghost" size="sm" onClick={() => revoke(s.token)}>Revoke</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

"use client";
import { useState } from "react";
import { toast } from "sonner";
import { updateUser } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UpdateNameForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  async function save() {
    setLoading(true);
    const { error } = await updateUser({ name });
    setLoading(false);
    if (error) return toast.error(error.message ?? "Update failed");
    toast.success("Name updated.");
  }
  return (
    <Card>
      <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={save} disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
      </CardContent>
    </Card>
  );
}

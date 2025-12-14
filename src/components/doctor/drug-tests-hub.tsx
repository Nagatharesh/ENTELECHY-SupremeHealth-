
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FlaskConical } from "lucide-react";
import Link from "next/link";

export function DrugTestsHub() {
    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Drug Tests</CardTitle>
                    <CardDescription>Access the drug testing portal.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-8">
                    <p className="mb-6 text-muted-foreground">Click the button below to open the testing interface.</p>
                    <Button size="lg" className="glowing-shadow-interactive" asChild>
                        <Link href="https://light-header-81761237.figma.site" target="_blank" rel="noopener noreferrer">
                            <FlaskConical className="mr-2 h-5 w-5"/>
                            PRESS IT FOR TEST
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

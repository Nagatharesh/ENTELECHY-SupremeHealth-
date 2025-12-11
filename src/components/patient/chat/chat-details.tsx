
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShieldAlert, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Chat } from '@/lib/dummy-data';

const complaintCategories = ["Conduct", "Responsiveness", "Medical Advice", "Billing", "Other"];

export function ChatDetails({ chat }: { chat: Chat }) {
    const { toast } = useToast();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [ratingComment, setRatingComment] = useState("");
    const [complaintCategory, setComplaintCategory] = useState("");
    const [complaintText, setComplaintText] = useState("");

    const handleRatingSubmit = () => {
        if (rating === 0) {
            toast({ variant: 'destructive', title: 'Please select a rating' });
            return;
        }
        toast({ title: 'Feedback Submitted', description: `You rated your chat ${rating} stars. Thank you!` });
        // Reset state
        setRating(0);
        setHoverRating(0);
        setRatingComment("");
    };

    const handleComplaintSubmit = () => {
        if (!complaintCategory || !complaintText) {
            toast({ variant: 'destructive', title: 'Incomplete Complaint', description: 'Please select a category and describe your issue.' });
            return;
        }
        const complaintId = `complaint_${Date.now()}`;
        toast({
            title: "Complaint received — strict action will be taken.",
            description: `Reference: ${complaintId}`,
            duration: 10000,
        });
        // Reset state
        setComplaintCategory("");
        setComplaintText("");
    };

    return (
        <div className="space-y-6 p-4">
            <Card className="glassmorphism">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2"><Star className="text-yellow-400" />Rate this Conversation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Star
                                key={star}
                                className={`w-8 h-8 cursor-pointer transition-colors ${star <= (hoverRating || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                    <Textarea placeholder="Optional: Add a comment..." value={ratingComment} onChange={(e) => setRatingComment(e.target.value)} />
                    <Button className="w-full" onClick={handleRatingSubmit}>Submit Rating</Button>
                </CardContent>
            </Card>

            <Card className="glassmorphism border-destructive/50">
                <CardHeader>
                    <CardTitle className="text-destructive flex items-center gap-2"><ShieldAlert />File a Complaint</CardTitle>
                    <CardDescription>If you had an issue, please let us know. We take all complaints seriously.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Select value={complaintCategory} onValueChange={setComplaintCategory}>
                        <SelectTrigger><SelectValue placeholder="Select complaint category..." /></SelectTrigger>
                        <SelectContent>
                            {complaintCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Textarea placeholder="Please describe the issue in detail..." value={complaintText} onChange={(e) => setComplaintText(e.target.value)} />
                    <Button variant="destructive" className="w-full" onClick={handleComplaintSubmit}>Submit Complaint</Button>
                </CardContent>
            </Card>
        </div>
    );
}

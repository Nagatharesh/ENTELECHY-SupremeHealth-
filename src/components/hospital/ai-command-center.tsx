'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cpu, Bot, HeartPulse, Users, Building, AlertTriangle, List, Loader2, PlayCircle } from 'lucide-react';
import { SystemAnalysisOutput, analyzeSystem } from '@/ai/flows/agent-system-analysis';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const priorityColors = {
  High: 'bg-destructive/20 text-destructive border-destructive/50',
  Medium: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/50',
  Low: 'bg-green-500/10 text-green-400 border-green-500/50',
};

const statusColors = {
  Queued: 'bg-gray-500/20 text-gray-400',
  'In Progress': 'bg-blue-500/20 text-blue-400 animate-pulse',
  Completed: 'bg-green-500/20 text-green-400',
};

export function AICommandCenter() {
  const [analysis, setAnalysis] = useState<SystemAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const runAnalysis = async () => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeSystem({ timestamp: new Date().toISOString() });
      setAnalysis(result);
    } catch (error) {
      console.error("Error running system analysis:", error);
      // Handle error state in UI
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  return (
    <div className="space-y-6">
      <Card className="glassmorphism glowing-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-gradient-glow text-2xl flex items-center gap-2">
              <Cpu className="w-8 h-8" />
              AI Micro-OS Command Center
            </CardTitle>
            <CardDescription>Real-time overview of the AI multi-agent system.</CardDescription>
          </div>
          <Button onClick={runAnalysis} disabled={isLoading} variant="outline" className="glowing-shadow-interactive">
            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <PlayCircle className="mr-2" />}
            {isLoading ? 'Analyzing...' : 'Run System Analysis'}
          </Button>
        </CardHeader>
      </Card>

      <AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingState />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {analysis && !isLoading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AgentStatusCard agents={analysis.agents} />
              <ResourceUsageCard usage={analysis.resourceUsage} />
              <RecommendationsCard recommendations={analysis.recommendations} />
            </div>
            <TaskQueueCard tasks={analysis.taskQueue} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const LoadingState = () => (
  <Card className="glassmorphism p-8 text-center">
    <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
    <p className="text-xl font-bold text-white mt-4 animate-pulse">ASI is analyzing system telemetry...</p>
    <p className="text-muted-foreground">Orchestrating agents and evaluating resource metrics.</p>
  </Card>
);

const AgentStatusCard = ({ agents }: { agents: SystemAnalysisOutput['agents'] }) => (
  <Card className="glassmorphism">
    <CardHeader>
      <CardTitle className="text-white flex items-center gap-2"><Bot />Agent Status</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {agents.map(agent => (
        <div key={agent.name} className="p-3 rounded-lg bg-background/50 border-l-4 border-primary/50">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-white">{agent.name}</p>
            <span className={cn('text-xs font-bold', agent.status === 'Alert' ? 'text-destructive' : 'text-primary')}>{agent.status}</span>
          </div>
          <p className="text-xs text-muted-foreground truncate">{agent.task}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);

const ResourceUsageCard = ({ usage }: { usage: SystemAnalysisOutput['resourceUsage'] }) => (
  <Card className="glassmorphism">
    <CardHeader>
      <CardTitle className="text-white">Simulated Resource Usage</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <div className="flex justify-between text-sm mb-1"><span>CPU</span><span>{usage.cpu.toFixed(1)}%</span></div>
        <Progress value={usage.cpu} indicatorColor="hsl(var(--chart-1))" />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1"><span>Memory</span><span>{usage.memory.toFixed(1)}%</span></div>
        <Progress value={usage.memory} indicatorColor="hsl(var(--chart-2))" />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1"><span>Network</span><span>{usage.network.toFixed(1)}%</span></div>
        <Progress value={usage.network} indicatorColor="hsl(var(--chart-3))" />
      </div>
    </CardContent>
  </Card>
);

const RecommendationsCard = ({ recommendations }: { recommendations: string[] }) => (
  <Card className="glassmorphism">
    <CardHeader>
      <CardTitle className="text-white flex items-center gap-2"><AlertTriangle />Proactive Recommendations</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {recommendations.map((rec, index) => (
        <p key={index} className="text-sm text-muted-foreground p-2 bg-background/50 rounded-md border border-border/50">
          - {rec}
        </p>
      ))}
    </CardContent>
  </Card>
);

const TaskQueueCard = ({ tasks }: { tasks: SystemAnalysisOutput['taskQueue'] }) => (
  <Card className="glassmorphism">
    <CardHeader>
      <CardTitle className="text-white flex items-center gap-2"><List />AI Task Queue</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.taskId} className={cn("p-3 rounded-lg flex items-center justify-between", priorityColors[task.priority])}>
            <div>
              <p className="font-semibold">{task.description}</p>
              <p className="text-xs">Task ID: {task.taskId}</p>
            </div>
            <div className={cn("px-2 py-1 text-xs font-bold rounded-full", statusColors[task.status])}>
              {task.status}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

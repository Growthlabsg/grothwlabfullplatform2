"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { formatDate } from "@/utils/format"

interface Task {
  id: string
  title: string
  completed: boolean
  dueDate: string
  priority: "high" | "medium" | "low"
}

interface TaskListProps {
  tasks: Task[]
  className?: string
}

export function TaskList({ tasks: initialTasks, className }: TaskListProps) {
  const [tasks, setTasks] = useState(initialTasks)

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border border-amber-200"
      case "low":
        return "bg-green-100 text-green-800 border border-green-200"
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200"
    }
  }

  return (
    <Card className={`border-slate-200 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-growthlab-slate">Tasks & Milestones</CardTitle>
        <CardDescription>Your upcoming tasks and milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start space-x-4 p-3 rounded-lg transition-all hover:bg-slate-50 group"
            >
              <Checkbox
                id={task.id}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-1 border-slate-300 data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500"
              />
              <div className="flex-1 space-y-1">
                <label
                  htmlFor={task.id}
                  className={`font-medium text-growthlab-slate cursor-pointer ${task.completed ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.title}
                </label>
                <div className="flex items-center text-xs">
                  <span className="text-muted-foreground">Due: {formatDate(task.dueDate)}</span>
                  <span
                    className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

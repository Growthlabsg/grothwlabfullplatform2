"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ModerationSettings() {
  const [autoModeration, setAutoModeration] = useState({
    enabled: true,
    spamThreshold: 0.7,
    harassmentThreshold: 0.8,
    inappropriateThreshold: 0.75,
    misinformationThreshold: 0.85,
  })

  const [contentFilters, setContentFilters] = useState({
    spam: true,
    harassment: true,
    inappropriate: true,
    misinformation: true,
    profanity: true,
    sensitiveTopics: false,
    politicalContent: false,
  })

  const [userReporting, setUserReporting] = useState({
    enabled: true,
    anonymousReporting: true,
    requireDescription: false,
    notifyReporter: true,
    limitReportsPerDay: true,
    reportsPerDayLimit: 10,
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Automated Moderation</CardTitle>
          <CardDescription>Configure AI-powered content moderation settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-moderation">Enable Automated Moderation</Label>
              <p className="text-sm text-muted-foreground">
                Use AI to automatically detect and flag potentially problematic content
              </p>
            </div>
            <Switch
              id="auto-moderation"
              checked={autoModeration.enabled}
              onCheckedChange={(checked) => setAutoModeration({ ...autoModeration, enabled: checked })}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Confidence Thresholds</h3>
            <p className="text-sm text-muted-foreground">
              Set the minimum confidence level required for the AI to flag content
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="spam-threshold">Spam Detection</Label>
                  <span className="text-sm">{Math.round(autoModeration.spamThreshold * 100)}%</span>
                </div>
                <Slider
                  id="spam-threshold"
                  min={0}
                  max={1}
                  step={0.05}
                  value={[autoModeration.spamThreshold]}
                  onValueChange={([value]) => setAutoModeration({ ...autoModeration, spamThreshold: value })}
                  disabled={!autoModeration.enabled}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="harassment-threshold">Harassment Detection</Label>
                  <span className="text-sm">{Math.round(autoModeration.harassmentThreshold * 100)}%</span>
                </div>
                <Slider
                  id="harassment-threshold"
                  min={0}
                  max={1}
                  step={0.05}
                  value={[autoModeration.harassmentThreshold]}
                  onValueChange={([value]) => setAutoModeration({ ...autoModeration, harassmentThreshold: value })}
                  disabled={!autoModeration.enabled}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="inappropriate-threshold">Inappropriate Content Detection</Label>
                  <span className="text-sm">{Math.round(autoModeration.inappropriateThreshold * 100)}%</span>
                </div>
                <Slider
                  id="inappropriate-threshold"
                  min={0}
                  max={1}
                  step={0.05}
                  value={[autoModeration.inappropriateThreshold]}
                  onValueChange={([value]) => setAutoModeration({ ...autoModeration, inappropriateThreshold: value })}
                  disabled={!autoModeration.enabled}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="misinformation-threshold">Misinformation Detection</Label>
                  <span className="text-sm">{Math.round(autoModeration.misinformationThreshold * 100)}%</span>
                </div>
                <Slider
                  id="misinformation-threshold"
                  min={0}
                  max={1}
                  step={0.05}
                  value={[autoModeration.misinformationThreshold]}
                  onValueChange={([value]) => setAutoModeration({ ...autoModeration, misinformationThreshold: value })}
                  disabled={!autoModeration.enabled}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Filters</CardTitle>
          <CardDescription>Configure which types of content should be filtered</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="filter-spam"
                checked={contentFilters.spam}
                onCheckedChange={(checked) => setContentFilters({ ...contentFilters, spam: checked })}
              />
              <Label htmlFor="filter-spam">Filter spam content</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="filter-harassment"
                checked={contentFilters.harassment}
                onCheckedChange={(checked) => setContentFilters({ ...contentFilters, harassment: checked })}
              />
              <Label htmlFor="filter-harassment">Filter harassment and bullying</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="filter-inappropriate"
                checked={contentFilters.inappropriate}
                onCheckedChange={(checked) => setContentFilters({ ...contentFilters, inappropriate: checked })}
              />
              <Label htmlFor="filter-inappropriate">Filter inappropriate content</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="filter-misinformation"
                checked={contentFilters.misinformation}
                onCheckedChange={(checked) => setContentFilters({ ...contentFilters, misinformation: checked })}
              />
              <Label htmlFor="filter-misinformation">Filter misinformation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="filter-profanity"
                checked={contentFilters.profanity}
                onCheckedChange={(checked) => setContentFilters({ ...contentFilters, profanity: checked })}
              />
              <Label htmlFor="filter-profanity">Filter profanity</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="filter-sensitive"
                checked={contentFilters.sensitiveTopics}
                onCheckedChange={(checked) => setContentFilters({ ...contentFilters, sensitiveTopics: checked })}
              />
              <Label htmlFor="filter-sensitive">Filter sensitive topics</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="filter-political"
                checked={contentFilters.politicalContent}
                onCheckedChange={(checked) => setContentFilters({ ...contentFilters, politicalContent: checked })}
              />
              <Label htmlFor="filter-political">Filter political content</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Reporting</CardTitle>
          <CardDescription>Configure how users can report content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="user-reporting">Enable User Reporting</Label>
              <p className="text-sm text-muted-foreground">Allow users to report problematic content</p>
            </div>
            <Switch
              id="user-reporting"
              checked={userReporting.enabled}
              onCheckedChange={(checked) => setUserReporting({ ...userReporting, enabled: checked })}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="anonymous-reporting">Allow Anonymous Reporting</Label>
                <p className="text-sm text-muted-foreground">
                  Users can report content without revealing their identity
                </p>
              </div>
              <Switch
                id="anonymous-reporting"
                checked={userReporting.anonymousReporting}
                onCheckedChange={(checked) => setUserReporting({ ...userReporting, anonymousReporting: checked })}
                disabled={!userReporting.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="require-description">Require Description</Label>
                <p className="text-sm text-muted-foreground">Users must provide a description when reporting content</p>
              </div>
              <Switch
                id="require-description"
                checked={userReporting.requireDescription}
                onCheckedChange={(checked) => setUserReporting({ ...userReporting, requireDescription: checked })}
                disabled={!userReporting.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notify-reporter">Notify Reporter</Label>
                <p className="text-sm text-muted-foreground">
                  Send notifications to users when their reports are reviewed
                </p>
              </div>
              <Switch
                id="notify-reporter"
                checked={userReporting.notifyReporter}
                onCheckedChange={(checked) => setUserReporting({ ...userReporting, notifyReporter: checked })}
                disabled={!userReporting.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="limit-reports">Limit Reports Per Day</Label>
                <p className="text-sm text-muted-foreground">Limit the number of reports a user can submit per day</p>
              </div>
              <Switch
                id="limit-reports"
                checked={userReporting.limitReportsPerDay}
                onCheckedChange={(checked) => setUserReporting({ ...userReporting, limitReportsPerDay: checked })}
                disabled={!userReporting.enabled}
              />
            </div>

            {userReporting.limitReportsPerDay && (
              <div className="flex items-center space-x-4">
                <Label htmlFor="reports-limit" className="flex-shrink-0">
                  Reports Limit:
                </Label>
                <Input
                  id="reports-limit"
                  type="number"
                  min={1}
                  max={100}
                  value={userReporting.reportsPerDayLimit}
                  onChange={(e) =>
                    setUserReporting({
                      ...userReporting,
                      reportsPerDayLimit: Number.parseInt(e.target.value) || 10,
                    })
                  }
                  disabled={!userReporting.enabled || !userReporting.limitReportsPerDay}
                  className="w-24"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}

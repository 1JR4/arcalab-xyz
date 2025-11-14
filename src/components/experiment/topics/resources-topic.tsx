"use client";

import { Book, Newspaper, Users, Mail, FileText, Zap, HelpCircle, MessageSquare, Activity, Github, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
  name: string;
  description: string;
  icon: any;
  href: string;
}

const mainResources: Resource[] = [
  { name: "About", description: "Learn about our mission and team", icon: Users, href: "#about" },
  { name: "Blog", description: "Latest news and insights", icon: Newspaper, href: "#blog" },
  { name: "Careers", description: "Join our growing team", icon: Zap, href: "#careers" },
  { name: "Contact", description: "Get in touch with us", icon: Mail, href: "#contact" },
  { name: "Docs", description: "Complete documentation", icon: Book, href: "#docs" },
  { name: "Changelog", description: "See what's new", icon: FileText, href: "#changelog" },
];

const supportResources = [
  { name: "Help Center", icon: HelpCircle, href: "#help" },
  { name: "Community", icon: MessageSquare, href: "#community" },
  { name: "Status", icon: Activity, href: "#status" },
];

const socialLinks = [
  { name: "GitHub", icon: Github, href: "#github" },
  { name: "Twitter", icon: Twitter, href: "#twitter" },
  { name: "LinkedIn", icon: Linkedin, href: "#linkedin" },
];

export function ResourcesTopic() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-white">Resources</h3>
        <p className="text-base text-white/70 leading-relaxed">
          Everything you need to get the most out of Flying Nimbus.
        </p>
      </div>

      {/* Main Resource Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mainResources.map((resource) => {
          const Icon = resource.icon;
          return (
            <a
              key={resource.name}
              href={resource.href}
              className={cn(
                "group p-5 rounded-2xl bg-white/8 dark:bg-gray-900/20",
                "backdrop-blur-md border-2 border-white/20 dark:border-white/15",
                "hover:bg-white/12 hover:border-white/30 transition-all duration-200",
                "flex flex-col gap-3"
              )}
            >
              <div className="flex items-center justify-between">
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20",
                  "flex items-center justify-center border border-amber-500/30",
                  "group-hover:scale-110 transition-transform"
                )}>
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all">
                  →
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">{resource.name}</h4>
                <p className="text-sm text-white/65">{resource.description}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Support Strip */}
      <div className={cn(
        "p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10",
        "border-2 border-blue-500/20 dark:border-blue-500/15",
        "backdrop-blur-md"
      )}>
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white">Support & Community</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supportResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <a
                  key={resource.name}
                  href={resource.href}
                  className={cn(
                    "group flex items-center gap-3 p-4 rounded-xl",
                    "bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm",
                    "border border-white/20 dark:border-white/15",
                    "hover:bg-white/15 hover:border-blue-500/40 transition-all duration-200"
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{resource.name}</div>
                  </div>
                  <div className="text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                    →
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Developer Resources */}
      <div className={cn(
        "p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10",
        "border-2 border-purple-500/20 dark:border-purple-500/15",
        "backdrop-blur-md"
      )}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
              <Book className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Developer Documentation</h4>
              <p className="text-sm text-white/70">
                API reference, SDKs, code examples, and integration guides for building tools.
              </p>
            </div>
          </div>
          <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 whitespace-nowrap">
            Visit docs
          </button>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Connect with us</h4>
        <div className="flex gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                className={cn(
                  "w-12 h-12 rounded-xl bg-white/10 dark:bg-gray-900/20",
                  "backdrop-blur-sm border border-white/20 dark:border-white/15",
                  "flex items-center justify-center",
                  "hover:bg-white/15 hover:border-amber-500/40 hover:scale-110",
                  "transition-all duration-200 group"
                )}
                title={social.name}
              >
                <Icon className="w-5 h-5 text-white/70 group-hover:text-amber-400 transition-colors" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        {[
          "Terms of Service",
          "Privacy Policy",
          "Cookie Policy",
          "Acceptable Use",
          "Security",
          "GDPR",
          "Accessibility",
          "Licenses",
        ].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-white/60 hover:text-amber-400 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Footer Note */}
      <div className={cn(
        "p-4 rounded-xl bg-white/5 dark:bg-gray-900/15",
        "border border-white/10 text-center"
      )}>
        <p className="text-xs text-white/50">
          Built with care by the Flying Nimbus team. Made for creators, builders, and dreamers.
        </p>
      </div>
    </div>
  );
}

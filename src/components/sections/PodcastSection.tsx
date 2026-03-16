import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Mic, ExternalLink, Play } from "lucide-react";
import podcastIsThisTheFuture from "@/assets/podcast-isthisTheFuture.jpg";

export function PodcastSection() {
  return (
    <section className="min-h-[50vh] flex items-center px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.p variants={fadeUp} className="label-mono mb-4 text-primary">Media</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Podcast & Interviews
        </motion.h2>

        <div className="space-y-6">
          {/* UNICORNI Podcast */}
          <motion.div variants={fadeUp} className="monolith-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <a
                href="https://www.youtube.com/watch?v=xaysX2ENb5E"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 group relative block"
              >
                <img
                  src="https://i.ytimg.com/vi/xaysX2ENb5E/mqdefault.jpg"
                  alt="UNICORNI Podcast - Davide Tuzi"
                  className="w-full md:w-72 rounded-lg object-cover aspect-video"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-12 h-12 text-background fill-background" />
                </div>
              </a>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Mic className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  <span className="label-mono text-primary">Podcast · In Italiano 🇮🇹</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Error: TEAM failure — Trovare un equilibrio con i propri Co-Founder
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  <span className="font-medium text-foreground">UNICORNI Podcast</span> · Ep. #15
                </p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Come gestire un fallimento startup, l'importanza della composizione del team e della comunicazione interna. Davide celebra il suo fallimento con Nexton e condivide cosa ha imparato.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.youtube.com/watch?v=xaysX2ENb5E"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground rounded-lg px-4 py-2 font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Guarda su YouTube
                  </a>
                  <a
                    href="https://open.spotify.com/show/4ptXWDTVPnsHGcV3qRm6Tn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm border border-border rounded-lg px-4 py-2 font-medium text-secondary-foreground hover:text-primary hover:border-primary/20 transition-colors"
                  >
                    🎧 Spotify
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                  <a
                    href="https://podcasts.apple.com/us/podcast/ep-15-error-team-failure-come-trovare-un-equilibrio/id1773770629?i=1000706334618"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm border border-border rounded-lg px-4 py-2 font-medium text-secondary-foreground hover:text-primary hover:border-primary/20 transition-colors"
                  >
                    🍎 Apple Podcasts
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Is This The Future? Podcast */}
          <motion.div variants={fadeUp} className="monolith-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <a
                href="https://music.amazon.it/podcasts/0bef1ecf-5ba9-471a-99e5-01720a2dac47/episodes/6347a56d-23be-47f8-b7ad-e7f1152f2f85/is-this-the-future-episode-1-davide-tuzi-nexton-italy-and-street-lights"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 group relative block"
              >
                <img
                  src={podcastIsThisTheFuture}
                  alt="Is This The Future? - Davide Tuzi"
                  className="w-full md:w-72 rounded-lg object-cover aspect-video"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-12 h-12 text-background fill-background" />
                </div>
              </a>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Mic className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  <span className="label-mono text-primary">Podcast · In English 🇬🇧</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Episode 1: Davide Tuzi (NEXTON, Italy and Street-lights)
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  <span className="font-medium text-foreground">Is This The Future?</span> · Ep. #1 · 43 min
                </p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Davide talks about his journey as Co-Founder and CEO of NEXTON Ideas — the Italian startup revolutionising street-lights. Topics include his education, career, the mission behind Nexton, and his vision for the future.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://music.amazon.it/podcasts/0bef1ecf-5ba9-471a-99e5-01720a2dac47/episodes/6347a56d-23be-47f8-b7ad-e7f1152f2f85/is-this-the-future-episode-1-davide-tuzi-nexton-italy-and-street-lights"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground rounded-lg px-4 py-2 font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Listen on Amazon Music
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
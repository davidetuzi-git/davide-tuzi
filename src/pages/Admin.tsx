import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function Admin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="monolith-card max-w-sm w-full mx-4 p-8 text-center"
      >
        <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-4" strokeWidth={1.5} />
        <h1 className="text-xl font-semibold text-foreground mb-2">Admin</h1>
        <p className="text-muted-foreground text-sm">
          La dashboard admin non è più disponibile. Il sito è ora indipendente.
        </p>
      </motion.div>
    </div>
  );
}

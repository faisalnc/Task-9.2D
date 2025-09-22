import { tutorials } from "@/data/tutorials";
import { Star } from "lucide-react";

export default function Tutorials() {
  return (
    <section className="bg-card px-6 py-8 shadow-lg">
      <h3 className="text-2xl text-foreground text-center font-semibold mb-6">
        Featured Tutorials
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {tutorials.map((t, i) => (
          <div
            key={i}
            className="bg-background text-card-foreground rounded shadow p-4"
          >
            <img
              src={t.image}
              alt={t.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h4 className="font-bold text-foreground mb-1">{t.title}</h4>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-xs text-muted-foreground italic mb-2">
              {t.description}
            </p>
            <hr className="border-border mb-3" />
            <div className="flex items-center text-sm">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="mr-2 text-muted-foreground">{t.rating}</span>
              <span className="ml-auto font-medium text-muted-foreground">
                Author: {t.username}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="bg-secondary hover:bg-muted text-secondary-foreground font-medium py-2 px-6 rounded-full transition">
          See all tutorials
        </button>
      </div>
    </section>
  );
}

import { ChatBubbleIcon, VideoIcon, LockClosedIcon, GroupIcon, LightningBoltIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

const features = [
    {
        icon: ChatBubbleIcon,
        title: "Instans Messaging",
        description: "Lightning fast messages with real-time delivery. Chat with friends and colleagues seamlessly"
    },
    {
        icon: VideoIcon,
        title: "HD Video Calls",
        description: "Crystal-clear video calls with high-quality audio and video. Stay connected with your loved ones in real-time"
    },
    {
        icon: LockClosedIcon,
        title: "Privacy First",
        description: "Your privacy is our priority. All messages are end-to-end encrypted and your data is stored securely"
    },
    {
        icon: GroupIcon,
        title: "Group Chats",
        description: "Create group chats with up to 100 members. Share messages, photos, and videos with your friends and colleagues"
    },
    {
        icon: LightningBoltIcon,
        title: "Lightning Fast",
        description: "Optimized for speed and performance. Works seamlessly across all your devices."
    }
]

function FeaturesSection() {
    const getGridClass = (index: number) => {
        if (index === 3) return "lg:col-start-2 lg:col-span-2";
        if (index === 4) return "md:col-span-2 lg:col-start-4 lg:col-span-2";
        return "lg:col-span-2";
    };

    return (
        <section className="grid place-items-center mt-12 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {features.map((feature, index) => (
                <FeatureCard
                    key={index}
                    icon={<feature.icon className="size-7" />}
                    title={feature.title}
                    description={feature.description}
                    className={getGridClass(index)}
                />
            ))}
        </section>
    )
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
}

function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
    return (
        <div className={cn("bg-muted p-4 rounded-sm max-w-sm flex flex-col text-center items-center justify-center space-y-2 h-full", className)}>
            <div className="bg-sidebar-border w-10 h-10 rounded-md grid place-items-center">{icon}</div>
            <h4 className="font-extrabold text-lg">{title}</h4>
            <p className="">{description}</p>
        </div>
    )
}

export default FeaturesSection
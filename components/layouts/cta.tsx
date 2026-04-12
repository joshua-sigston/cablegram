import { Button } from "@/components/ui/button";
import { Show, SignInButton } from "@clerk/nextjs"

function Cta() {
    return (
        <section className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-16">Connect Instantly</h1>
                <h3 className="text-3xl font-semibold">Chat Smarter</h3>
                <p className="leading-7 text-muted-foreground">The modern messageing platform that combines lightning fast chat and crystal-clear video calls in one seamless experience</p>
            </div>
            <div className="mt-6">
                <Show when="signed-out">
                    <SignInButton mode="modal">
                        <Button size="lg" className="rounded-sm text-base">Get Started</Button>
                    </SignInButton>
                </Show>
            </div>
            <div className="flex flex-col items-center justify-center mt-6 space-y-3">
                <p className="text-base text-muted-foreground">Trusted by thousands of users worldwide</p>
                <div className="space-y-4">
                    <div className="">
                        <p className="font-extrabold text-lg">50+</p>
                        <p className="text-muted-foreground text-base">Active Users</p>
                    </div>
                    <div className="">
                        <p className="font-extrabold text-lg">100%</p>
                        <p>Uptime</p>
                    </div>
                    <div className="">
                        <p className="font-extrabold text-lg">1M+</p>
                        <p>Messages Sent</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 text-center flex flex-col space-y-4">
                <h3 className="font-extrabold text-xl">Everything you need to stay connected</h3>
                <p className="text-muted-foreground">Powerful features designed for seamless communication, whether you are chatting with friends or collaberating with teams.</p>
            </div>
        </section>
    )
}

export default Cta
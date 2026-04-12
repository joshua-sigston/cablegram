import { Show, SignInButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { DotFilledIcon } from "@radix-ui/react-icons"


function EnhancedCta() {
    return (
        <section className="mt-12 text-center bg-chart-1 p-4 rounded-sm space-y-4 max-w-4xl mx-auto">
            <h3 className="font-bold text-lg">Ready to transform your conversations?</h3>
            <p className="text-sm text-chart-3">Join thousands of users who have already discovered a better way to communicate. Start your journey with Beam today -- it is completely free.</p>
            <div className="">
                <Show when="signed-out">
                    <SignInButton mode="modal">
                        <Button size="lg" className="rounded-sm text-lg px-4 py-2">Get Started</Button>
                    </SignInButton>
                </Show>
            </div>
            <div className="grid place-items-center space-y-4 text-lg sm:text-sm md:grid-cols-3 md:space-y-0 md:space-x-4 mt-6 lg:text-[15px]">
                <p className="flex items-center"><span className=""><DotFilledIcon className="text-blue-400 size-6" /></span>Free Forever Plan</p>
                <p className="flex items-center"><span className=""><DotFilledIcon className="text-blue-400 size-6" /></span>No Credit Card Required</p>
                <p className="flex items-center"><span className=""><DotFilledIcon className="text-blue-400 size-6" /></span>Setup in seconds</p>
            </div>
        </section>
    )
}

export default EnhancedCta
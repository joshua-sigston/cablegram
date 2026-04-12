import Link from "next/link"
import { TwitterLogoIcon, GitHubLogoIcon, DiscordLogoIcon } from "@radix-ui/react-icons"

export default function Footer() {
    return (
        <footer className="border-t bg-background mt-16 pb-4 pt-4">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-around">
                    <div className="flex">
                        <Link href="/" className="font-bold text-xl uppercase tracking-widest mb-4 block">
                            Beam
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs hidden">
                            The modern messaging platform that combines lightning-fast chat and crystal-clear video calls in one seamless experience.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Product</h4>
                        {/* <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
                        </ul> */}
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Company</h4>
                        {/* <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul> */}
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Legal</h4>
                        {/* <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                        </ul> */}
                    </div>
                </div>

                <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Beam Messaging. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                        <Link href="#" className="hover:text-primary transition-colors">
                            <TwitterLogoIcon className="w-5 h-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            <GitHubLogoIcon className="w-5 h-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            <DiscordLogoIcon className="w-5 h-5" />
                            <span className="sr-only">Discord</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

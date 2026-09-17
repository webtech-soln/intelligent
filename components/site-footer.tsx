import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "./ui";
import { FOOTER_COLUMNS, SITE } from "@/lib/content";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "./social-icons";

const SOCIALS = [
  { label: "LinkedIn", Icon: LinkedInIcon },
  { label: "Facebook", Icon: FacebookIcon },
  { label: "X", Icon: XIcon },
  { label: "Instagram", Icon: InstagramIcon },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink">
      <Container className="flex flex-col gap-13 pt-[76px] pb-9">
        <div className="flex flex-col gap-14 lg:flex-row lg:gap-20">
          <div className="flex flex-col gap-5 lg:w-[340px]">
            <Logo />
            <p className="text-sm leading-[1.7] text-fg-inv-2">
              A technology-focused company based in Ohio, USA — building custom
              software and delivering proven ERP, CRM and restaurant systems.
            </p>
            <div className="flex gap-[10px]">
              {SOCIALS.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-[38px] items-center justify-center rounded-sm border border-line-inv text-fg-inv-2 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-10 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <h3 className="font-mono text-[11px] font-semibold tracking-[0.127em] text-gold">
                  {column.title}
                </h3>
                {column.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm leading-[1.5] text-fg-inv-2 transition-colors hover:text-fg-inv"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-line-inv" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-fg-inv-2">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-7">
            <Link href="#" className="text-[13px] text-fg-inv-2 hover:text-fg-inv">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[13px] text-fg-inv-2 hover:text-fg-inv">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

import { SocialRefs, Stats } from "components";
import RandomQuotes from "components/floating-quotes";
import Image from "components/image";
import { getCurrentLang } from "lib/headers";
import { getTranslationsCache } from "lib/server-cache";
import Link from "next/link";
import AvatarImg from "../images/me.png";
import styles from "./HomeVariant1.module.css";

export default async function HomeVariant1({ quotes }) {
    const lang = await getCurrentLang();
    const texts = await getTranslationsCache("about_me");
    const linksTranslation = await getTranslationsCache("links");

    const links = [
        {
            route: `/${lang}/resume`,
            title: linksTranslation.resume.title,
            sub: linksTranslation.resume.subTitle,
        },
        {
            route: `/${lang}/blog`,
            title: linksTranslation.blog.title,
            sub: linksTranslation.blog.subTitle,
        },
        {
            route: `/${lang}/example-projects`,
            title: linksTranslation.examples.title,
            sub: linksTranslation.examples.subTitle,
        },
        {
            route: `https://tanstack.itamar.dev`,
            title: linksTranslation.tanstack.title,
            sub: linksTranslation.tanstack.subTitle,
        },
        {
            route: `https://reactwind.itamar.dev`,
            title: linksTranslation.reactwind.title,
            sub: linksTranslation.reactwind.subTitle,
        },
    ];

    return (
        <div className={styles.page}>
            <article className={styles.article}>
                {/* Avatar */}
                <section className={styles.avatarSection}>
                    <div className={styles.avatarWrap}>
                        <Image
                            image={AvatarImg}
                            alt="my picture"
                            title="Me, preparing for my wedding"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center 20%",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </div>
                </section>

                {/* About */}
                <section className={styles.aboutSection}>
                    <h1>{texts.title}</h1>
                    <h2>
                        {texts.subtitle}
                    </h2>
                </section>

                {/* Social */}
                <section className={styles.socialSection}>
                    <SocialRefs />
                </section>

                <hr className={styles.divider} />

                {/* Quote */}
                <section className={styles.quoteSection}>
                    <RandomQuotes quotes={quotes} />
                </section>

                {/* Links */}
                <nav className={styles.linksSection}>
                    {links.map((link) => (
                        <Link
                            key={link.route}
                            href={link.route}
                            className={styles.linkRow}
                            target={
                                link.route.startsWith("http")
                                    ? "_blank"
                                    : "_self"
                            }
                        >
                            <div>
                                <span className={styles.linkTitle}>
                                    {link.title}
                                </span>
                                <span className={styles.linkSub}>
                                    {link.sub}
                                </span>
                            </div>
                            <span className={styles.linkArrow}>→</span>
                        </Link>
                    ))}
                </nav>

                {/* Stats */}
                <section className={styles.statsSection}>
                    <Stats />
                </section>
            </article>
        </div>
    );
}

import SeoHead from '@/components/SeoHead';
import Footer from '@/components/Footer';
import DocsSidebar, { useDocsActiveSection } from '@/components/docs/DocsSidebar';
import DocsSections from '@/components/docs/DocsSections';
import { Vortex } from '@/components/ui/vortex';
import { webPageSchema } from '@/lib/seo/schemas';
import productStyles from './ProductPage.module.css';
import styles from './DocsPage.module.css';

const DocsPage = () => {
  const { activeId, navigate } = useDocsActiveSection();

  return (
    <>
      <div className={productStyles.productPageBg}>
        <Vortex
          particleCount={120}
          baseHue={266}
          rangeSpeed={0.3}
          baseRadius={1}
          rangeRadius={1.6}
          backgroundColor="#04050a"
          containerClassName="w-full h-full"
        />
        <div className={productStyles.productPageAtmosphere} />
      </div>

      <main className="relative z-20 min-h-screen pt-14 md:pt-16">
        <div className={productStyles.productPage}>
          <div className={productStyles.productPageContent}>
            <SeoHead
              title="Documentation | Elystra"
              description="Elystra platform documentation — architecture, deal state model, event reference, integration model, and the public API."
              path="/docs"
              jsonLd={webPageSchema(
                '/docs',
                'Documentation | Elystra',
                'Platform documentation for Elystra revenue infrastructure.',
              )}
            />

            <div className={styles.shell}>
              <DocsSidebar activeId={activeId} onNavigate={navigate} />

              <div className={styles.main}>
                <div className={styles.eyebrow}>Documentation</div>
                <h1 className={styles.pageTitle}>Elystra platform documentation</h1>
                <p className={styles.sub}>
                  Elystra is the revenue rail agencies run deals through — scope, signature, payment, and
                  post-close operations as one instrumented sequence. This document covers the architecture,
                  the state model, the event system, the integration model, and the public API.
                </p>

                <DocsSections />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DocsPage;

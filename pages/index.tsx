import styles from '../styles/Home.module.css'
import { getHeroUnit } from "../lib/kontentClient";
import { GetStaticProps, NextPage } from 'next';
import { HeroUnit } from '../models/content-types/hero_unit';
import { CanvasClient } from "@uniformdev/canvas";
import { Composition } from "@uniformdev/canvas-react";
import LayoutCanvas from "../src/components/LayoutCanvas";

import doEnhance from "../lib/enhancer";
import resolveRenderer from "../lib/resolveRenderer";


const Home: NextPage<IndexProps> = ({ heroUnit }) => {
  return (
    <main >
      <div className={styles.hero}>
        <h1 className="append-dot">{heroUnit.elements.title.value}</h1>
        <div className={styles.summary} dangerouslySetInnerHTML={{ __html: heroUnit.elements.marketingMessage.value }}>
        </div>
      </div>
      <Composition data={composition} resolveRenderer={resolveRenderer}>
        <LayoutCanvas composition={composition} fields={fields} />
      </Composition>
    </main>
  )
}


interface IndexProps {
  heroUnit: HeroUnit;
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const heroUnit = await getHeroUnit();

  const composition = await getComposition(slug);
  await doEnhance(composition);

  return {
    props: { heroUnit,
          composition,
         fields: topic.fields, },
  };
}

async function getComposition(slug) {
  const client = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });
  const { composition } = await client.getCompositionBySlug({
    slug,
  });
  return composition;
}
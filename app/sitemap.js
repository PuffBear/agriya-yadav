export default function sitemap() {
  const base = "https://agriya-yadav.vercel.app";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/research`, lastModified: new Date() },
    { url: `${base}/research/coordination-collapse`, lastModified: new Date() },
    { url: `${base}/research/cpt-gradient-dynamics`, lastModified: new Date() },
    { url: `${base}/research/popeg`, lastModified: new Date() },
    { url: `${base}/research/shared-beliefs`, lastModified: new Date() },
    { url: `${base}/shelf`, lastModified: new Date() },
    { url: `${base}/work`, lastModified: new Date() },
    { url: `${base}/work/h-sharc`, lastModified: new Date() },
    { url: `${base}/work/influencer-partisanship`, lastModified: new Date() },
    { url: `${base}/work/order-matching-engine`, lastModified: new Date() },
    { url: `${base}/work/taskbound`, lastModified: new Date() },
    { url: `${base}/work/turnsports`, lastModified: new Date() },
  ];
}

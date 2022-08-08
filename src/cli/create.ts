import path from 'path';

const getPathing = (pathname: string) => {
  return path.normalize(path.join(process.cwd(), pathname));
}

export const create = (name: string) => {
  const data = {
    name: name,
  };
  const templatesConfig = {
    parcel: getPathing('templates/.parcelrc.hbs'),
    postcss: getPathing('templates/.postcssrc.hbs'),
    sass: getPathing('templates/.sassrc.hbs'),
    scrowl: getPathing('templates/.scrowlrc.hbs')
  };

  console.log('template pathing', templatesConfig);
};

export default {
  create,
};
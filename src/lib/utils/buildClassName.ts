type PartVariants = string | boolean | undefined | null;

function buildClassName(...parts: PartVariants[]) {
  return parts.filter((part): part is string => !!part).join(' ');
}

export default buildClassName;
export function findNodeByPath(path, nodes) {
  const cleanPath = path.replace(/^\$\.?/, "").trim();

  if (!cleanPath) return null;

  // const parts = cleanPath.split(/[\.\[\]]+/).filter(p => p);
  const parts = cleanPath.split(/\.|\[|\]/).filter((p) => p);

  let searchLbl = parts[parts.length - 1];

  for (let node of nodes) {
    if (
      node.data.label === searchLbl ||
      node.data.label === `[${searchLbl}]` ||
      (node.data.value && node.data.label === parts[parts.length - 1])
    ) {
      return node.id;
    }
  }

  return null;
}

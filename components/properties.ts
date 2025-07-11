let _properties: any = null;

export async function getProperties() {
  if (!_properties) {
    _properties = await import("../static-props/technologies.json").then((module) => module.default);
  }
  return _properties;
}

export type Properties = Awaited<ReturnType<typeof getProperties>>;

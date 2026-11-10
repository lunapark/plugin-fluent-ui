import packageDefinition from "../package.json" with { type: "json" };

export const PLUGIN_ID = "fluent-ui";

export const PACKAGE_NAME = packageDefinition.name;

export const PACKAGE_VERSION = packageDefinition.version;

export const RUNTIME_TARGET = `${ PACKAGE_NAME }/runtime`;

export const CSS_PREFIX = "--lp-fluent";

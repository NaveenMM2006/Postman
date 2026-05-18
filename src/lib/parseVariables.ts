export function parseVariables(
  text: string,
  variables: Record<string, string>
) {

  let parsedText = text;

  for (const key in variables) {

    const regex = new RegExp(
      `{{${key}}}`,
      "g"
    );

    parsedText =
      parsedText.replace(
        regex,
        variables[key]
      );
  }

  return parsedText;
}
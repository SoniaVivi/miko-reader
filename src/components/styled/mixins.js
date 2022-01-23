export const circle = (size) => `
  max-width: ${size};
  max-height: ${size};
  min-width: ${size};
  min-height: ${size};
  border-radius: 50%;
`;

export const bevel = (height, radius = height * 0.75) => `
  height: ${height}px;
  border-radius: ${radius}px;
`;

export const forceSize = (width, height) => `
  max-width: ${width};
  max-height: ${height};
  min-width: ${width};
  min-height: ${height};
`;

export const center = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

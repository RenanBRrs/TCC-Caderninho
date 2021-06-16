import Switch from 'react-switch';

export default (props) => {
  const colorPrimary = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary')
    .trim();

  const colorSecondary = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--color-secondary')
    .trim();

  const size = Number(
    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size')
      .trim()
      .replace('px', ''),
  );
  return (
    <Switch
      onChange={() => props.setChecked(!props.checked)}
      checked={props.checked}
      onColor={colorPrimary}
      onHandleColor={colorSecondary}
      width={props.size * size}
      height={props.size * 0.4 * size}
    />
  );
};

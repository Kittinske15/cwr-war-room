export function colorData(num) {
  switch (true) {
    case num > 6:
      return '#0f724d';

    case num > 3:
      return '#1c9352';

    case num > 0:
      return '#7eb25b';

    case num < 0:
      return '#df940f';

    case num < -3:
      return '#B13434';

    default:
      return '#eee';

  }
}

export function colorScale() {
  let scale = [];
  scale = scale.concat('#0f724d');
  scale = scale.concat('#1c9352');
  scale = scale.concat('#7eb25b');
  scale = scale.concat('#df940f');
  scale = scale.concat('#b13434');
  scale = scale.concat('#eee');
  return scale;
}

export function numberScale() {
  let scale = [];
  scale = scale.concat('6% or more');
  scale = scale.concat('3% - 6%');
  scale = scale.concat('0% - 3%');
  scale = scale.concat('-3% - 0%');
  scale = scale.concat('less than -3%');
  return scale;
}
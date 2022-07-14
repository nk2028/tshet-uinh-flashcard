export function ayaka_2021(音韻地位, 字頭) {
  const is = (x) => 音韻地位.屬於(x);

  function 應用規則(table) {
    for (const [k, v] of table) if (is(k)) return v;
  }

  const 聲母規則 = [
    ["幫母", "b"],
    ["滂母", "p"],
    ["並母", "pp"],
    ["明母", "m"],
    ["端知母", "d"],
    ["透徹母", "t"],
    ["定澄母", "tt"],
    ["泥孃母", "n"],
    ["來母", "l"],
    ["精莊母", "z"],
    ["清初母", "c"],
    ["從崇母", "cc"],
    ["心生母", "s"],
    ["邪俟母", "ss"],
    ["章母", "j"],
    ["昌母", "q"],
    ["船母", "qq"],
    ["書母", "x"],
    ["常母", "xx"],
    ["日母", "gn"],
    ["見母", "g"],
    ["溪母", "k"],
    ["羣母", "kk"],
    ["疑母", "nn"],
    ["影母", "v"],
    ["曉母", "h"],
    ["匣母", "hh"],
    ["云以母", ""],
  ];

  const 韻母規則 = [
    // 一等
    ["東韻 一等", "u-"],
    ["冬韻", "o-"],
    ["模韻", "o-"],
    ["泰韻", "a-i"],
    ["咍灰韻", "w-i"],
    ["痕魂韻", "w-"],
    ["寒韻", "a-"],
    ["豪韻", "a-u"],
    ["歌韻 一等", "a-"],
    ["唐韻", "a-"],
    ["登韻", "w-"],
    ["侯韻", "w-u"],
    ["覃韻", "w-"],
    ["談韻", "a-"],
    // 二等
    ["江韻", "o-"],
    ["佳韻", "e-"],
    ["皆韻", "e-i"],
    ["夬韻", "a-i"],
    ["刪韻", "a-"],
    ["山韻", "e-"],
    ["肴韻", "a-u"],
    ["麻韻 二等", "a-"],
    ["庚韻 二等", "a-"],
    ["耕韻", "e-"],
    ["咸韻", "e-"],
    ["銜韻", "a-"],
    // 三等 AB
    ["支韻", "ie-"],
    ["脂韻", "i-"],
    ["祭韻", "ie-i"],
    ["眞臻韻", "i-"],
    ["仙韻", "ie-"],
    ["宵韻", "ie-u"],
    ["歌麻韻 三等", "ia-"],
    ["庚韻 三等 或 清韻", "ia-"],
    ["幽韻", "i-u"],
    ["侵韻", "i-"],
    ["鹽韻", "ie-"],
    // 三等 C
    ["東韻 三等", "ɨu-"],
    ["鍾韻", "ɨo-"],
    ["之韻", "ɨ-"],
    ["微韻", "ɨ-i"],
    ["魚韻", "ɨw-"],
    ["虞韻", "ɨo-"],
    ["廢韻", "ɨo-i"],
    ["欣文韻", "ɨ-"],
    ["元韻", "ɨo-"],
    ["陽韻", "ɨa-"],
    ["蒸韻", "ɨ-"],
    ["尤韻", "ɨu-"],
    ["嚴凡韻", "ɨo-"],
    // 四等
    ["齊韻", "e-i"],
    ["先韻", "e-"],
    ["蕭韻", "e-u"],
    ["青韻", "e-"],
    ["添韻", "e-"],
  ];

  function 韻尾規則() {
    if (is("通江宕梗曾攝")) return is("舒聲") ? "nn" : "k";
    if (is("臻山攝")) return is("舒聲") ? "n" : "t";
    if (is("深咸攝")) return is("舒聲") ? "m" : "p";
    return "";
  }

  let 聲母 = 應用規則(聲母規則);
  let 韻母 = 應用規則(韻母規則);
  let 韻尾 = 韻尾規則();

  if (is("合口")) {
    if (韻母.startsWith("i")) 韻母 = "y" + 韻母.slice(1);
    else if (韻母.startsWith("ɨ")) 韻母 = "ʉ" + 韻母.slice(1);
    else 韻母 = "u" + 韻母;
  }

  const is重紐母 = is("幫滂並明見溪羣疑影曉母");
  const is重紐韻 = is("支脂祭眞仙宵清侵鹽韻");

  if (
    is("二等") ||
    (is重紐母 && ((is重紐韻 && is("重紐B類")) || is("庚韻 三等"))) ||
    is("云母 或 莊組")
  ) {
    韻母 = "r" + 韻母;
  }

  if (is("上聲")) 韻尾 = 韻尾 + "x";
  else if (is("去聲")) 韻尾 = 韻尾 + "h";

  return (聲母 + 韻母 + 韻尾)
    .replace("ɨ", "ii")
    .replace("ʉ", "uu")
    .replace("-", "");
}

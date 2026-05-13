$src='scenariu-preliminar-biserica-invierea-domnului-v49.doc'
$dst='scenariu-preliminar-biserica-invierea-domnului-v50.doc'
$text = Get-Content $src -Raw
$repl = [ordered]@{}
$repl.Add('È›','ț')
$repl.Add('Èš','Ț')
$repl.Add('È™','ș')
$repl.Add('È˜','Ș')
$repl.Add('Äƒ','ă')
$repl.Add('Ä‚','Ă')
$repl.Add('Ã¢','â')
$repl.Add('Ã‚','Â')
$repl.Add('Ã®','î')
$repl.Add('ÃŽ','Î')
$repl.Add('â€“','–')
$repl.Add('â€”','—')
$repl.Add('â€ž','„')
$repl.Add('â€','”')
$repl.Add('â€œ','“')
$repl.Add('â€™','’')
foreach($k in $repl.Keys){
  $text = $text.Replace($k,$repl[$k])
}
Set-Content $dst $text -Encoding UTF8

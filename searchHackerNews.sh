# http://stackoverflow.com/questions/296536/urlencode-from-a-bash-script
rawurlencode() {
  local string="${1}"
  local strlen=${#string}
  local encoded=""

  for (( pos=0 ; pos<strlen ; pos++ )); do
     c=${string:$pos:1}
     case "$c" in
        [-_.~a-zA-Z0-9] ) o="${c}" ;;
        * )               printf -v o '%%%02x' "'$c"
     esac
     encoded+="${o}"
  done
  echo "${encoded}"    # You can either set a return variable (FASTER) 
  REPLY="${encoded}"   #+or echo the result (EASIER)... or both... :p
}

curl 'https://uj5wyc0l7x-dsn.algolia.io/1/indexes/Item_production/query' -H 'Origin: https://hn.algolia.com' -H 'Accept-Encoding: gzip,deflate' -H 'X-Algolia-API-Key: 8ece23f8eb07cd25d40262a1764599b1' -H 'Accept-Language: en-US,en;q=0.8,gl;q=0.6' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36' -H 'Content-type: application/json' -H 'Accept: */*' -H 'X-Algolia-Application-Id: UJ5WYC0L7X' -H 'Referer: https://hn.algolia.com/?q=whos+hiring' -H 'Connection: keep-alive' --data-binary '{"params":"query=$( rawurlencode "$1" )&hitsPerPage=25&page=0&getRankingInfo=1&minWordSizefor1Typo=5&minWordSizefor2Typos=9&tagFilters=%5B%22story%22%5D&numericFilters=%5B%5D&advancedSyntax=true&queryType=prefixNone","apiKey":"8ece23f8eb07cd25d40262a1764599b1","appID":"UJ5WYC0L7X"}' --compressed

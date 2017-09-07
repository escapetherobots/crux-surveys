function localtunnel {
  lt -s creativecrux3030surveys3030 --port 5000
}
until localtunnel; do
  echo "localtunnel server crashed"
  sleep 2
done

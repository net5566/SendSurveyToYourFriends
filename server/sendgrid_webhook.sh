function localtunnel {
  lt -s sfhla78l34as13dlkf --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
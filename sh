sudo mkdir /root && sudo mkdir /root/.config/
sudo ln -s /Users/DGI/Documents/Gilsdav/sail-hub/root /root
# sudo ln -s /Users/DGI/Documents/Gilsdav/sail-hub/* /root
# sudo ln -s /Users/DGI/Documents/Gilsdav/sail-hub/.config /root
# sudo ln -s /Users/DGI/Documents/Gilsdav/sail-hub/.vscode /root
# sudo ln -s /Users/DGI/Documents/Gilsdav/sail-hub/.ssh /root
sudo ln -s /Users/DGI/Documents/Gilsdav/sail-hub/tmp/sail-code-server-cache /tmp
# sudo ln -s /Users/DGI/Documents/Gilsdav/sail-hub/Projects /root

sail run https://github.com/cdr/sshcode

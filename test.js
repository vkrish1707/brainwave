setenv NVM_DIR "$HOME/.nvm"
if (-e "$NVM_DIR/nvm.sh") then
  source "$NVM_DIR/nvm.sh"
endif
if (-e "$NVM_DIR/bash_completion") then
  source "$NVM_DIR/bash_completion"
endif
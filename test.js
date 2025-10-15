# Set NVM_DIR
setenv NVM_DIR "$HOME/.nvm"

# Load NVM
if ( -f "$NVM_DIR/nvm.sh" ) then
    source "$NVM_DIR/nvm.sh"
endif

# Load NVM bash_completion if available
if ( -f "$NVM_DIR/bash_completion" ) then
    source "$NVM_DIR/bash_completion"
endif
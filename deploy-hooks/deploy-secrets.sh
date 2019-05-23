stp=$(($STEP + 0)) #ensure it's cast to an integer.

if [ $stp -eq 1 ]; then # 0 is the default (none) and we do nothing
    read -p "Ctrl-c now to cancel or to deploy secrets Press [Enter]" reply

    echo "Fetching keys..."
    aws kms list-keys --region us-east-1

    echo "Which key to use?"
    read key

    echo "Reading key attributes for " $key
    aws kms describe-key --key-id $key --region us-east-1

    read -p "Ctrl-c now and re-run the script if this is not the correct id, or press [Enter] to proceed"

    ISSUERS="$(cat ../.issuers.json)"
    echo "$ISSUERS"
    aws ssm put-parameter --name "/whitelabel/$STAGE/issuers" --value "$ISSUERS" --type "SecureString" --key-id $key --region us-east-1 --overwrite

    echo "Done"
else
    echo "Skipping secrets on step $stp"
fi

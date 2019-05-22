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

    echo "Set param 1"
    read param1

    echo "Set param 2"
    read param2

    aws ssm put-parameter --name "whitelabel/$STAGE/<rename me>" --value $param1 --type "SecureString" --key-id $key --region us-east-1
    aws ssm put-parameter --name "whitelabel/$STAGE/<rename me too>" --value $param2 --type "SecureString" --key-id $key --region us-east-1

    # somehow loop through issuers and set them in SSM
    # aws ssm put-parameter --name "whitelabel/$STAGE/issuers/<key>" --value $issuer --type "SecureString" --key-id $key --region us-east-1

    echo "Done"
else
    echo "Skipping secrets on step $stp"
fi

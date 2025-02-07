import requests
import base64
import webbrowser

# eBay Sandbox Credentials
CLIENT_ID = "SyedHass-AR-SBX-41d19c42d-926cb907"
CLIENT_SECRET = "SBX-1d19c42ded8b-32a0-41eb-a629-9a3e"
REDIRECT_URI = "Syed_Hassan_Ul_-SyedHass-AR-SBX-pilvw" 
EBAY_ENV = "sandbox"  # Use 'sandbox' for testing, 'production' for live use

# eBay OAuth URLs (Sandbox)
AUTH_URL = f"https://auth.sandbox.ebay.com/oauth2/authorize"
TOKEN_URL = "https://api.sandbox.ebay.com/identity/v1/oauth2/token"

# OAuth Scope (modify if needed)
SCOPE = "https://api.ebay.com/oauth/api_scope"

def get_auth_code():
    """Step 1: Open eBay OAuth Authorization URL in browser"""
    auth_link = f"{AUTH_URL}?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&response_type=code&scope={SCOPE}"
    
    print(f"Open this URL in your browser and log in:\n{auth_link}")
    
    # Automatically open the browser
    webbrowser.open(auth_link)
    
    # Prompt user to enter authorization code manually
    auth_code = input("\nPaste the authorization code here: ").strip()
    return auth_code

def get_access_token(auth_code):
    """Step 2: Exchange Authorization Code for Access Token"""
    credentials = f"{CLIENT_ID}:{CLIENT_SECRET}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()

    headers = {
        "Authorization": f"Basic {encoded_credentials}",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "authorization_code",
        "code": auth_code,
        "redirect_uri": REDIRECT_URI
    }

    response = requests.post(TOKEN_URL, headers=headers, data=data)
    token_info = response.json()

    if "access_token" in token_info:
        print("\n✅ Access Token Retrieved Successfully!")
        print(f"Access Token: {token_info['access_token']}")
        print(f"Expires in: {token_info['expires_in']} seconds")
    else:
        print("\n❌ Error retrieving access token:", token_info)

if __name__ == "__main__":
    auth_code = get_auth_code()
    if auth_code:
        get_access_token(auth_code)

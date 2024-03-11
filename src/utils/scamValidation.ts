export class ScamValidation {

    static isScam(txn: any, blacklist: any) {
        let blacklistedSender = this.validateSender(txn.transaction.sender, blacklist);

        if(blacklistedSender === true) {
            return true;
        }
        
        let blacklistedDomain = this.validateNote(txn.transaction.note, blacklist);

        if(blacklistedDomain === true) {
            return true;
        }

        return false;
    }

    static validateNote(b64Note: string, blacklist) {
        if(b64Note === null) {
            return false;
        }

        let domainBlacklist = this.extractBlacklistedDomains(blacklist);
        let note = atob(b64Note);

        let isScam = false;
        domainBlacklist.forEach(domain => {
            if(note.indexOf(domain) !== -1) {
                isScam = true;
                return;
            }
        });

        return isScam;
    }

    static validateSender(sender: string, blacklist: any) {
        let addressBlacklist = this.extractBlacklistedAddresses(blacklist);

        if(addressBlacklist.includes(sender)) {
            return true;
        }

        return false;
    }

    static extractBlacklistedDomains(blacklist) {
        return blacklist['domains'];
    }

    static extractBlacklistedAddresses(blacklist) {
        return blacklist['addresses'];
    }

}
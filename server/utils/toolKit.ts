export class toolKit{
    static sortArrayByProperty(array: any[], property: string): any[] {
        return array.sort((a, b) => {
            if (a[property] < b[property]) {
                return -1;
            }
            if (a[property] > b[property]) {
                return 1;
            }
            return 0;
        });
    }
};
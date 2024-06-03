#include <stdio.h>
#include <stdlib.h>

typedef struct
{
	char name[256];
	int age;
	int s;
} people;

int people_input(people* data);
void people_print(people data[], int number_of_people);

int main(void)
{
	people* data;
	int datasize = 256;
	data = (people*)malloc(sizeof(people) * 256);
	int number_of_people = 0;

	/* 入力部分 */
	number_of_people = people_input(&data);

	/* メモリ解放タイミング */
	free(data);

	/* 表示部分 */
	people_print(data, number_of_people);

	return 0;
}

int people_input(people* data)
{
	int i = 0;

	printf("名前、年齢、性別を1人ずつ入力してください。");
	printf("なお、終了する場合は年齢で -1 を入力してください。\n");

	while (data[i].age != -1) {
		printf("名前：");
		scanf("%s", data[i].name);
		printf("年齢：");
		scanf("%d", data[i].age);
		printf("性別(男ー1 女ー2)：");
		scanf("%d", data[i].s);
		i++;
	}
	return i;
}

void people_print(people data[], int number_of_people)
{
	int i;
	for (i = 0; i != number_of_people; i++) {
		printf("%d人目：名前 = %s", i + 1, data[i].name);
		printf("%d人目：年齢 = %d", i + 1, data[i].age);
		if (data[i].s == 1) {
			printf("%d人目：性別 = 男性", i + 1);
		}
		else {
			printf("%d人目：性別 = 女性", i + 1);
		}
	}
}
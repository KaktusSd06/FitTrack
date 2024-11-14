using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitTrack.API.Migrations
{
    /// <inheritdoc />
    public partial class Exercise_Training_Set_Relations_Changes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExerciseIndividualTraining");

            migrationBuilder.AlterColumn<double>(
                name: "Weight",
                table: "Weights",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<double>(
                name: "Weight",
                table: "Sets",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AddColumn<int>(
                name: "IndividualTrainingId",
                table: "Sets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Goods",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_Sets_IndividualTrainingId",
                table: "Sets",
                column: "IndividualTrainingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sets_IndividualTrainings_IndividualTrainingId",
                table: "Sets",
                column: "IndividualTrainingId",
                principalTable: "IndividualTrainings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sets_IndividualTrainings_IndividualTrainingId",
                table: "Sets");

            migrationBuilder.DropIndex(
                name: "IX_Sets_IndividualTrainingId",
                table: "Sets");

            migrationBuilder.DropColumn(
                name: "IndividualTrainingId",
                table: "Sets");

            migrationBuilder.AlterColumn<decimal>(
                name: "Weight",
                table: "Weights",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AlterColumn<decimal>(
                name: "Weight",
                table: "Sets",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Goods",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ExerciseIndividualTraining",
                columns: table => new
                {
                    ExercisesId = table.Column<int>(type: "integer", nullable: false),
                    IndividualTrainingsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseIndividualTraining", x => new { x.ExercisesId, x.IndividualTrainingsId });
                    table.ForeignKey(
                        name: "FK_ExerciseIndividualTraining_Exercises_ExercisesId",
                        column: x => x.ExercisesId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseIndividualTraining_IndividualTrainings_IndividualTr~",
                        column: x => x.IndividualTrainingsId,
                        principalTable: "IndividualTrainings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseIndividualTraining_IndividualTrainingsId",
                table: "ExerciseIndividualTraining",
                column: "IndividualTrainingsId");
        }
    }
}
